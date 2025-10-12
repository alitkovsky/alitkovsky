"use client";

export default function ThemeBootScript() {
  const inlineScript = `
    (function() {
      var DEFAULT_THEME = '04';
      var MAX_THEME_INDEX = 16;

      function sanitize(theme) {
        if (typeof theme !== 'string' || !/^\\d{1,2}$/.test(theme)) {
          return DEFAULT_THEME;
        }

        var numeric = Number(theme);
        if (!Number.isFinite(numeric) || numeric < 0 || numeric > MAX_THEME_INDEX) {
          return DEFAULT_THEME;
        }

        return String(numeric).padStart(2, '0');
      }

      function persist(theme) {
        try {
          localStorage.setItem('preferred-theme', theme);
        } catch (e) {}

        var maxAge = 60 * 60 * 24 * 365; // one year
        document.cookie = 'preferred-theme=' + theme + ';path=/;max-age=' + maxAge;
      }

      function readCookieTheme() {
        var match = document.cookie.match(/(?:^|; )preferred-theme=([^;]+)/);
        return match ? match[1] : null;
      }

      try {
        var theme = null;

        try {
          theme = localStorage.getItem('preferred-theme');
        } catch (e) {}

        if (theme === null) {
          theme = readCookieTheme();
        }

        var padded = sanitize(theme === null ? DEFAULT_THEME : theme);
        persist(padded);

        document.body.className = document.body.className
          .split(' ')
          .filter(function(cls) { return cls && cls.indexOf('theme--') !== 0; })
          .join(' ');
        document.body.classList.add('theme--' + padded);

        // Extract --theme-color from that theme
        var tempDiv = document.createElement("div");
        tempDiv.className = "theme--" + padded;
        document.body.appendChild(tempDiv);
        var color = getComputedStyle(tempDiv).getPropertyValue('--color--background--100').trim();
        document.body.removeChild(tempDiv);

        // Apply to meta tag
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta && color) {
          meta.setAttribute('content', color);
        }

      } catch(e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: inlineScript }} />;
}
