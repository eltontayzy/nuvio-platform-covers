# nuvio-platform-covers

Folder covers for the Platforms collection in Nuvio (Netflix, Prime Video, Disney+, Apple TV, HBO Max). Each one is the
service's vector logo on a gradient in its brand colours, at 1280×720 with the logo kept in the centre so tile crops
never cut it.

![Preview](preview.png)

Nuvio loads them from the raw GitHub links, for example:

```
https://raw.githubusercontent.com/eltontayzy/nuvio-platform-covers/main/covers/netflix.png?v=2
```

## Changing a cover

1. Edit the gradient or logo size for that service in `source/cover.html` (the `C` table).
2. Run `node source/render.mjs` to re-render everything into `covers/` (drawn at 2x and scaled down, so it needs ImageMagick).
3. Commit and push.
4. Bump the `?v=` number on the cover links in the Nuvio collection (export, edit, Import with Overwrite on each
   profile). The apps keep a downloaded cover for as long as its link stays the same, so without a new `?v=` they
   go on showing the old image.

Logos come from Wikimedia Commons. `appletv-lum.svg` rebuilds Apple's 2025 glass Apple TV logo (iridescent rim) on top of
the flat vector mark. The logos are trademarks of their owners and are here only to label the folders in a personal setup.
