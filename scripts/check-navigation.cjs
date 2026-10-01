// Run against the local server with Playwright and Chromium available in the review environment.
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:3001";

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    await context.addInitScript(() => {
      window.motionCheck = { history: 0, animations: [], geometry: [] };
      const animate = Element.prototype.animate;
      Element.prototype.animate = function (...args) {
        if (this.id === "content") window.motionCheck.history++;
        return animate.apply(this, args);
      };
      if (!document.startViewTransition) return;
      const start = document.startViewTransition.bind(document);
      document.startViewTransition = (...args) => {
        const transition = start(...args);
        transition.ready.then(() => {
          if (window.holdTransition) {
            window.heldAnimations = document.getAnimations().filter(animation => ["route-in", "route-out"].includes(animation.animationName));
            window.heldAnimations.forEach(animation => { animation.pause(); animation.currentTime = 0; });
          }
          for (const animation of document.getAnimations()) {
            window.motionCheck.animations.push(animation.animationName);
            if (animation.animationName?.startsWith("-ua-view-transition-group")) window.motionCheck.geometry.push(animation.effect.getKeyframes());
          }
        }).catch(() => {}); // Interrupted transitions can be cancelled by subsequent navigation.
        return transition;
      };
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    async function visit(path) {
      assert.equal((await page.goto(base + path, { waitUntil: "networkidle" })).status(), 200);
      await page.evaluate(() => document.fonts.ready);
    }
    async function pointer(selector) {
      // Locator.click scrolls sticky links into view and changes the position we want to test.
      const box = await page.locator(selector).boundingBox();
      assert.ok(box);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }
    async function watch() {
      await page.evaluate(() => {
        window.scrollSamples = [];
        const start = performance.now();
        function sample(time) {
          window.scrollSamples.push({ path: location.pathname, y: scrollY });
          if (time - start < 1800) requestAnimationFrame(sample);
        }
        requestAnimationFrame(sample);
      });
    }
    async function settled(path, y) {
      await page.waitForURL("**" + path);
      await page.waitForTimeout(700);
      const positions = await page.evaluate(() => window.scrollSamples.filter(frame => frame.path === location.pathname).map(frame => frame.y));
      assert.ok(positions.length, "Capture frames on the destination page");
      assert.deepEqual([...new Set(positions)], [y], "Restore scroll before animating the destination page");
      assert.equal(await page.evaluate(() => document.documentElement.style.scrollBehavior), "", "Restore smooth scrolling after history navigation");
    }
    async function navbarInk(clip) {
      // Check painted pixels: DOM visibility alone misses a header hidden by transition snapshots.
      const png = await page.screenshot({ clip });
      return page.evaluate(async bytes => {
        const image = await createImageBitmap(new Blob([Uint8Array.from(bytes)], { type: "image/png" }));
        const canvas = document.createElement("canvas");
        canvas.width = image.width; canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
        const pixels = context.getImageData(0, 0, image.width, image.height).data;
        let ink = 0;
        for (let i = 0; i < pixels.length; i += 4) if (Math.min(pixels[i], pixels[i + 1], pixels[i + 2]) > 190) ink++;
        return ink;
      }, Array.from(png));
    }

    await visit("/");
    assert.deepEqual(await page.locator(".selected .project-feature h3, .selected .project-card h3").allTextContents(), ["MenTeR", "ACM", "Cityscapes"]);
    const featured = ["/work/menter-rf-analog-multi-agent-netlist-design", "/open-sources", "/work/cityscapes-traffic-safety-segmentation"];
    assert.deepEqual(await page.locator(".selected .project-feature, .selected .project-card").evaluateAll(cards => cards.map(card => card.getAttribute("href"))), featured);
    for (const href of featured) {
      await visit("/");
      const selector = `.selected :is(.project-feature,.project-card)[href="${href}"]`;
      await page.evaluate(selector => scrollTo({ top: document.querySelector(selector).offsetTop - 110, behavior: "instant" }), selector);
      await watch(); await pointer(selector); await settled(href, 0);
    }
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      await visit("/about");
      await page.evaluate(() => scrollTo({ top: 2200, behavior: "instant" }));
      const brand = await page.locator(".nav .brand").boundingBox();
      const expectedInk = await navbarInk(brand);
      assert.ok(expectedInk > 100, "Navbar is painted before navigation");
      await page.evaluate(() => { window.holdTransition = true; });
      await watch();
      if (width === 390) {
        await pointer(".menu-btn");
        await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Publications" }).click();
      } else await pointer('.nav-links a[href="/publications"]');
      await page.waitForFunction(() => window.heldAnimations?.length > 0);
      for (const time of [0, 120, 300]) {
        await page.evaluate(time => window.heldAnimations.forEach(animation => { animation.currentTime = time; }), time);
        assert.ok((await navbarInk(brand)) >= expectedInk * .95, `Navbar stays fully visible at ${time}ms, width ${width}`);
        assert.ok(await page.evaluate(width => {
          const target = document.querySelector(width === 390 ? ".menu-btn" : '.nav-links a[href="/projects"]');
          const box = target.getBoundingClientRect();
          return target.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
        }, width), "Navbar stays clickable during transitions");
      }
      await page.evaluate(() => { window.holdTransition = false; window.heldAnimations.forEach(animation => animation.play()); });
      await settled("/publications", 0);
      assert.equal(await page.evaluate(() => document.body.style.overflow), "", "Mobile menu releases scrolling");
      const motion = await page.evaluate(() => window.motionCheck);
      assert.ok(motion.animations.includes("route-in"), "Keep the native page entrance");
      for (const frames of motion.geometry) {
        assert.equal(new Set(frames.map(frame => frame.height)).size, 1, "Never resize a long page during navigation");
        assert.equal(new Set(frames.map(frame => frame.transform)).size, 1, "Never interpolate between page scroll offsets");
      }
      await watch(); await page.goBack(); await settled("/about", 2200);
      assert.ok((await page.evaluate(() => window.motionCheck.history)) > motion.history, "History fades after restoration");
      await watch(); await page.goForward(); await settled("/publications", 0);
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await visit("/");
    await pointer(".hero-cta"); await page.waitForTimeout(150);
    const midway = await page.evaluate(() => scrollY);
    await page.waitForTimeout(1100);
    assert.ok(midway > 0 && midway < (await page.evaluate(() => scrollY)), "Keep smooth in-page scrolling");
    await page.goBack(); await page.waitForTimeout(1100);
    assert.equal(await page.evaluate(() => window.motionCheck.history), 0, "Anchor history never fades the page");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await visit("/about"); await page.evaluate(() => scrollTo({ top: 2200, behavior: "instant" }));
    await watch(); await pointer('.nav-links a[href="/products"]'); await settled("/products", 0);
    assert.ok(!(await page.evaluate(() => window.motionCheck.animations)).includes("route-in"), "Respect reduced motion");
    await watch(); await page.goBack(); await settled("/about", 2200);
    assert.equal(await page.evaluate(() => window.motionCheck.history), 0, "Reduced motion disables the history fade");
    assert.deepEqual(errors, [], "No browser errors");
    console.log("Navigation verified: navbar painted throughout desktop/mobile transitions, featured work, instant history restoration, anchors, and reduced motion.");
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
