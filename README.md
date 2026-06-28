# Mary Rose Anonat — VA Portfolio Website

A simple, professional portfolio website for Mary Rose Anonat, Executive & Personal Support Virtual Assistant.

## Files
```
index.html      ← main page
css/style.css   ← all styling
js/script.js    ← interactivity (dark mode, animations, contact form, etc.)
```

---

## 1. Contact form — already connected ✓

The contact form is wired up to Formspree and sends straight to `maryrose021423@outlook.com`.

- Form name: **Portfolio Contact Form**
- Endpoint: `https://formspree.io/f/xeebklbb`

**One thing left to do:** the first time a real visitor (not a test from your own dashboard) submits the form, Formspree will send a confirmation email to activate it — click the link in that email. After that, every submission lands in the inbox automatically.

If you ever need to find this again, log into formspree.io → Forms → Portfolio Contact Form → Integration tab.

---

## 2. Publish it live with GitHub Pages

You'll need a free GitHub account: **https://github.com/join**

### Step-by-step

1. **Create a new repository**
   - Go to https://github.com/new
   - Repository name: `mary-rose-portfolio` (or anything you like)
   - Set it to **Public**
   - Don't check any of the "initialize with" boxes
   - Click **Create repository**

2. **Upload your files**
   - On the new repo's page, click **uploading an existing file**
   - Drag in `index.html`, the `css` folder, and the `js` folder (keep the folder structure — GitHub preserves it when you drag whole folders)
   - Scroll down, click **Commit changes**

3. **Turn on GitHub Pages**
   - In your repo, go to **Settings** → **Pages** (left sidebar)
   - Under **Build and deployment** → **Source**, select **Deploy from a branch**
   - Branch: `main`, folder: `/ (root)` → click **Save**

4. **Get your live link**
   - Still on the Pages settings screen, wait about 1 minute, then refresh
   - Your live URL will appear at the top, looking like:
     `https://YOUR-USERNAME.github.io/mary-rose-portfolio/`
   - That's your real, shareable website link.

Any time you want to update content, edit the file on GitHub (pencil icon) or re-upload it — the live site updates automatically within a minute.

---

## 3. Before going live, personalize these

Search `index.html` for `EDIT:` comments — they mark every placeholder:

- [ ] Your professional photo (hero section + about section)
- [ ] University name (Education section)
- [ ] Resume download link
- [ ] Sample work images/descriptions
- [ ] Testimonials (real client names + quotes once available)
- [ ] Social links (Facebook, Instagram, TikTok, Indeed, OnlineJobs.ph, GitHub)

---

## Optional: custom domain

If you later buy a domain (e.g. `maryroseanonat.com`), GitHub Pages supports it for free —
add it under **Settings → Pages → Custom domain** and follow GitHub's DNS instructions.
