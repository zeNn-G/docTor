export const tabsSnippet = `
<Tabs defaultValue="$1">
  <TabsList>
      <TabsTrigger value="$1">$1</TabsTrigger>
      <TabsTrigger value="$2">$2</TabsTrigger>
  </TabsList>
  <TabsContent value="$1">$1</TabsContent>
  <TabsContent value="$2">$2</TabsContent>
</Tabs>`;

export const codeSnippet = `
\`\`\`$1
$2
\`\`\`
`;

export const linkSnippet = `
$1 [$2]($3)
`;

export const orderedListSnippet = `
1. $1
2. $2
3. $3
`;

export const unOrderedListSnippet = `
- $1
- $2
- $3
`;

export const tableSnippet = `
| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| $1       | $2       | $3       |`;
