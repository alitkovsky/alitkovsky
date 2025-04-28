"use client";

export default function ThemeBootScript() {
  const inlineScript = `
    (function() {
      try {
        var theme = localStorage.getItem('preferred-theme');

        // If no saved theme, detect system preference
        if (theme === null) {
          var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          theme = prefersDark ? '00' : '16';
          localStorage.setItem('preferred-theme', theme);
        }

        // Fallback if theme is invalid
        if (!/^\\d{1,2}$/.test(theme) || Number(theme) > 16) {
          theme = '16';
          localStorage.setItem('preferred-theme', theme);
        }

        var padded = ('0' + theme).slice(-2);
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