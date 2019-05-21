export default class Geometry {
  constructor (options) {
    let geometry = new THREE.BufferGeometry()

    let collection = options.collection
    let color = new THREE.Color(0x6c6c6c)
    let positions = []
    let normals = []
    let colors = []
    let sizes = []
    let translations = []
    let rotations = []
    let scales = []
    let indxs = []
    let uids = []
    let i = 0
    let j = 0

    for (let model of collection) {
      let oPositions = model.attrs.position.array
      let oNormals = model.attrs.normal.array
      let index = model.index
      let length = oPositions.length - 1

      for (let j = length; j >= 0; j--) {
        if (j % 3 == 0 && Math.random() > (index == 0 ? 0.86 : 0.2)) {
          let px = oPositions[j + 2]
          let py = oPositions[j + 1]
          let pz = oPositions[j + 0]
          let nx = oNormals[j + 2]
          let ny = oNormals[j + 1]
          let nz = oNormals[j + 0]

          positions.push(px, py, pz)

          normals.push(nx, ny, nz)

          colors.push(color.r, color.g, color.b)

          sizes.push(3)

          let tx = 0
          let ty = 0
          let tz = 0
          let rx = 0
          let ry = 0 // index == 0 ? Math.PI / 2 : -Math.PI / 2,
          let rz = 0
          let scl = 115

          translations.push(tx, ty, tz)

          rotations.push(rx, ry, rz)

          scales.push(scl, scl, scl)

          uids.push(Math.random() * (length / 3))

          indxs.push(index)
        }
      }
    }

    geometry.addAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    )

    geometry.addAttribute(
      'normal',
      new THREE.Float32BufferAttribute(normals, 3)
    )

    geometry.addAttribute(
      'aColor',
      new THREE.Float32BufferAttribute(colors, 3)
    )

    geometry.addAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))

    geometry.addAttribute(
      'trs',
      new THREE.Float32BufferAttribute(translations, 3)
    )

    geometry.addAttribute(
      'rot',
      new THREE.Float32BufferAttribute(rotations, 3)
    )

    geometry.addAttribute('scl', new THREE.Float32BufferAttribute(scales, 3))

    geometry.addAttribute('indx', new THREE.Float32BufferAttribute(indxs, 1))

    geometry.addAttribute('uid', new THREE.Float32BufferAttribute(uids, 1))

    return geometry
  }
}
