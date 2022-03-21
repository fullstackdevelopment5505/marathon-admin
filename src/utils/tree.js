export const createTree = (data) => {
  if (!data) return [];
  const tree = [];
  const idMapping = data.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {});

  data.forEach(el => {
    // Handle the root element
    if (!el.parentId) {
      tree.push(el);
      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = data[idMapping[el.parentId]];
    // Add our current el to its parent's `children` array
    parentEl.children = [...(parentEl.children || []), el];
  });
  return tree;
}

export const traverseTree = (tree) => {
  const data = [];
  tree.forEach(function pushAll(node) {
    data.push(node);
    node.children && node.children.forEach(pushAll);
  })
  return data;
}

