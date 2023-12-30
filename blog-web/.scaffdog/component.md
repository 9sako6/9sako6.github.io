---
name: "component"
root: "."
output: "./src/components/**/*"
ignore: []
questions:
  name: "Please enter a component name."
---

# `{{ inputs.name | pascal }}/index.ts`

```typescript
export * from "./{{ inputs.name | pascal }}";
```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

```typescript
import styles from './{{ inputs.name | pascal }}.module.scss'

export type Props = {};

export const {{ inputs.name | pascal }}: React.FC<Props> = () => {
  return <div></div>;
};
```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.module.scss`

```scss

```
