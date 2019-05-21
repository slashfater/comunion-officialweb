export default class Geometry {
  constructor (options) {
    let geometry = new THREE.BufferGeometry()

    let collection = options.collection
    let slice = (Math.PI * 2) / (collection.length + 1)
    let color = new THREE.Color(0x3fd5d8)
    let positions = []
    let normals = []
    let colors = []
    let alphas = []
    let sizes = []
    let translations = []
    let rotations = []
    let scales = []
    let fixed = []
    let displ = []
    let burst = []
    let uids = []
    let i = 0
    let j = 0
    let r = 1000

    /**
     * draw shapes
     */
    for (let model of collection) {
      let oPositions = model.attrs.position.array
      let oNormals = model.attrs.normal.array
      let length = oPositions.length - 1

      for (let j = length; j >= 0; j--) {
        if (j % 3 == 0 && Math.random() > 0.92) {
          let px = oPositions[j + 2]
          let py = oPositions[j + 1]
          let pz = oPositions[j + 0]
          let nx = oNormals[j + 2]
          let ny = oNormals[j + 1]
          let nz = oNormals[j + 0]

          positions.push(px, py, pz)

          normals.push(nx, ny, nz)

          colors.push(color.r, color.g, color.b)

          alphas.push(1)

          sizes.push(3)

          let tx = Math.cos(slice * i) * r
          let ty = Math.sin(slice * i) * r
          let tz = 0
          let rx = 0
          let ry = 0
          let rz = Math.atan2(0 - tx, 0 - ty) + Math.PI
          let scl = 1

          translations.push(tx, ty, tz)

          rotations.push(rx, ry, rz)

          scales.push(scl, scl, scl)

          uids.push(Math.random() * (length / 3))

          fixed.push(1)

          displ.push(1)

          burst.push(0)
        }
      }

      ++i
    }

    /**
     * draw clouds
     */
    let particlesCount = 50
    let particlesTotal = particlesCount * (collection.length + 1)
    let rdmcolors = [0xffffff, 0xff7200, 0x3fd5d8]
    let spherical = new THREE.Spherical()
    let vector = new THREE.Vector3()

    // color.set( 0xff7200 )

    for (i = particlesTotal - 1; i >= 0; i--) {
      j = Math.floor(i / particlesCount)

      let cx = Math.cos(slice * j) * r
      let cy = Math.sin(slice * j) * r
      let cz = 0

      let phi = Math.acos(-1 + (2 * (i % particlesCount)) / particlesCount)
      let theta = Math.sqrt(particlesCount * Math.PI) * phi

      spherical.set(r / 2, phi, theta)

      vector.setFromSpherical(spherical)

      vector.multiplyScalar(THREE.Math.randFloat(0.5, 1))

      color.set(rdmcolors[i % 3])

      positions.push(vector.x, vector.y, vector.z)

      normals.push(vector.x, vector.y, vector.z)

      colors.push(color.r, color.g, color.b)

      alphas.push(1)

      sizes.push(4)

      translations.push(cx, cy, cz)

      rotations.push(0, 0, 0)

      scales.push(1, 1, 1)

      uids.push(Math.random() * particlesCount)

      fixed.push(1)

      displ.push(0)

      burst.push(1)
    }

    /**
     * draw walls 1
     */
    let cols = 43
    let rows = 23
    let padding = 200
    let width = cols * padding - padding
    let height = rows * padding - padding

    particlesCount = rows * cols

    color.set(0xffffff)

    for (let i = particlesCount - 1; i >= 0; i--) {
      let x = -1000.0
      let y = Math.floor(i / cols) * padding - height / 2
      let z = Math.round(i % cols) * padding - width / 2

      positions.push(x, y, z)

      normals.push(x, y, z)

      colors.push(color.r, color.g, color.b)

      alphas.push(0.4) // Math.random() + .5

      sizes.push(3)

      translations.push(0, 0, 0)

      rotations.push(0, 0, 0)

      scales.push(1, 1, 1)

      uids.push(Math.random() * particlesCount)

      fixed.push(0)

      displ.push(0)

      burst.push(0)
    }

    /**
     * draw walls 2
     */
    (cols = 23),
    (rows = 13),
    (padding = 300),
    (width = cols * padding - padding),
    (height = rows * padding - padding)

    particlesCount = rows * cols

    color.set(0xffffff)

    for (let i = particlesCount - 1; i >= 0; i--) {
      let x = 1000.0
      let y = Math.floor(i / cols) * padding - height / 2
      let z = Math.round(i % cols) * padding - width / 2

      positions.push(x, y, z)

      normals.push(x, y, z)

      colors.push(color.r, color.g, color.b)

      alphas.push(0.2) // Math.random() + .5

      sizes.push(8)

      translations.push(0, 0, 0)

      rotations.push(0, 0, 0)

      scales.push(1, 1, 1)

      uids.push(Math.random() * particlesCount)

      fixed.push(0)

      displ.push(0)

      burst.push(0)
    }

    console.log('total points ::', positions.length, uids.length)

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

    geometry.addAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1))

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

    geometry.addAttribute('uid', new THREE.Float32BufferAttribute(uids, 1))

    geometry.addAttribute('f', new THREE.Float32BufferAttribute(fixed, 1))

    geometry.addAttribute('d', new THREE.Float32BufferAttribute(displ, 1))

    geometry.addAttribute('b', new THREE.Float32BufferAttribute(burst, 1))

    return geometry
  }
}
