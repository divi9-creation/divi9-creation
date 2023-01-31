<script lang="ts">
  const logos = {
    light:
      'https://uploads-ssl.webflow.com/63be249a11e9471ec58e7615/63c094c22ab2ded42c1aa149_logo-light.svg',
    dark: 'https://uploads-ssl.webflow.com/63be249a11e9471ec58e7615/63c094c2be56c3f9c4b56d99_logo-dark.svg',
  };
</script>

<picture>
  <source srcset={logos.dark} media="(prefers-color-scheme: dark)" />
  <img alt="" src={logos.light} />
</picture>
