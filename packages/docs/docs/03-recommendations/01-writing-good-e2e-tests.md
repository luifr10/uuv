# Writing good E2E Tests

:::tip
Your test scenario should resemble as much as possible the user interactions with your application.<br/>
For this we recommend this order of priority in your DOM checks :
:::

## 1. Accessibility-based queries
1. ### Look for an element using its [accessible role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles#aria_role_types) and content
2. ### Look for an element using its content
3. ### Look for an element using its aria-label attribute

## 2. Test IDs
1. ### Look for an element using its data-testid attribute

