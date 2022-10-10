import uniqBy from 'lodash/uniqBy'
import { CS_TEST_CONFIG } from '#/clientStorage'
import { ETestNum } from '#/enum'

export function clone(val: any) {
  return JSON.parse(JSON.stringify(val))
}

export function resize(node: any, width: number, height: number) {
  node.width = width
  node.height = height
}

export function getImageFill(node: FrameNode): ImagePaint | null {
  if (!node.fills || node.fills.length === 0)
    return null
  const fills = node.fills
  const fill = fills.find((fill) => {
    return fill.type === 'IMAGE' && fill.imageRef
  }) as ImagePaint | undefined
  return fill || null
}

export function getSelectedImageNodes(selections: any) {
  const items = selections.map((node: any) => {
    const nodes = [node].filter(Boolean)
    const fills = nodes.map(n => getImageFill(n)).filter(Boolean)
    return fills.map((fill: any) => {
      const image = mg.getImageByHref(fill.imageRef)
      return { node, fill, image, href: fill.imageRef }
    })
  }).reduce((a: any, b: any) => a.concat(b), [])
  return uniqBy(items, (obj: any) => {
    return obj.node.id
  })
}

export async function changeNodeFill(node: FrameNode, href: string) {
  const newNode = node.clone()
  const imageFill = clone(getImageFill(node))
  if (imageFill) {
    imageFill.imageRef = href
    imageFill.scaleMode = 'FILL'
  }
  newNode.fills = [imageFill]
  node.remove()
  return newNode
}

export async function updateConfig(testnum: ETestNum) {
  await mg.clientStorage.setAsync(CS_TEST_CONFIG, testnum)
}

export async function getConfig() {
  return mg.clientStorage.getAsync(CS_TEST_CONFIG) ?? ETestNum.one
}
