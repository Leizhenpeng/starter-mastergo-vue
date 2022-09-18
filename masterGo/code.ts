/// <reference types="@mastergo/plugin-utils" />

mg.showUI(__html__, {
  width: 450,
  height: 600,
});
mg.ui.onmessage = prop => {
  if (prop.type === 'init') {
    const mg_ = mg as any;
    const ifDark = mg_.themeColor === 'dark' ? 1 : 0;
    mg.ui.postMessage({
      name: 'setTheme',
      ifDark: ifDark,
    })
  }
  if (prop.type === 'apply-code') {
    console.log('✅','code was applied');
    if (prop.triggerOne) {
      console.log('🔥','triggerOne was applied', prop.triggerOne);
    }
      mg.notify('notification after execution');
  }

  if (prop.type === 'create-rectangles') {
    const nodes = [] as any;

    for (let i = 0; i < prop.count; i++) {
      const rect = mg.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0,a:1 } }];
      mg.document.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    mg.document.currentPage.selection = nodes;
    mg.viewport.scrollAndZoomIntoView(nodes);

    // This is how mg responds back to the ui
    mg.ui.postMessage({
      type: 'create-rectangles',
      message: `Created ${prop} Rectangles`,
    });
  }
  
  if (prop.type ==='cancel'){
    mg.closePlugin();
  }
};

export {}