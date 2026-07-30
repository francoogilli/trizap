## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Tailwind

This project uses Tailwind CSS v4. Generate canonical utility classes whenever a value exists in the default theme. Do not use arbitrary values (`[...]`) for values that Tailwind already names.

Use the v4 spacing scale, including decimal steps, for exact pixel values:

- `92px` → `pb-23`
- `82px` → `pt-20.5`
- `46px` → `mt-11.5`
- `34px` → `p-8.5`
- `18px` → `px-4.5`
- `154px` → `max-w-38.5`
- `72px` → `max-h-18`

Prefer named utilities for colors, opacity, radius, and transitions, such as `border-black/9`, `bg-neutral-50`, `opacity-64`, `rounded-2xl`, and `duration-200`. Use project tokens with the v4 variable syntax, such as `text-(--muted)` and `text-(--green)`, instead of repeating their hex values.

Arbitrary values are reserved for values that are genuinely not in the theme, such as fluid formulas (`text-[clamp(...)]`), custom brand measurements that must stay exact, or one-off CSS values. If a custom breakpoint or token is reused, define it in the Tailwind theme and use a named utility instead of repeating `max-[...]` or another arbitrary variant.

Before finishing a Tailwind change, inspect the touched component for avoidable bracket utilities and run `npm run build`. Do not leave canonical-class suggestions unresolved when a named utility preserves the same value and appearance.
