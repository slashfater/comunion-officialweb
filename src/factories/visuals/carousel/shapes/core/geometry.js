export default class Geometry {
  constructor(options) {
    let geometry = new THREE.BufferGeometry();

    let collection = options.collection,
      slice = (Math.PI * 2) / (collection.length + 1),
      positions = [],
      normals = [],
      translations = [],
      rotations = [],
      scales = [],
      fixed = [],
      uids = [],
      uvs = [],
      i = 0,
      j = 0,
      r = 1000;

    for (let model of collection) {
      let oPositions = model.attrs.position.array,
        oNormals = model.attrs.normal.array,
        length = oPositions.length - 1;

      for (j = length; j >= 0; j--) {
        let position = oPositions[j];

        positions.push(position);

        let normal = oNormals[j];

        normals.push(normal);

        if (j % 3 == 0) {
          let tx = Math.cos(slice * i) * r,
            ty = Math.sin(slice * i) * r,
            tz = 0;

          translations.push(tx, ty, tz);

          let rx = 0,
            ry = 0,
            rz = Math.atan2(0 - tx, 0 - ty) + Math.PI;

          rotations.push(rx, ry, rz);

          let scl = 1;

          scales.push(scl, scl, scl);

          uids.push(Math.random() * (length / 3));

          uvs.push(0, 0);

          fixed.push(1);
        }
      }

      ++i;
    }

    console.log("slice ::", slice);

    console.log("total shapes ::", positions.length);

    geometry.addAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    geometry.addAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3)
    );

    geometry.addAttribute(
      "trs",
      new THREE.Float32BufferAttribute(translations, 3)
    );

    geometry.addAttribute(
      "rot",
      new THREE.Float32BufferAttribute(rotations, 3)
    );

    geometry.addAttribute("scl", new THREE.Float32BufferAttribute(scales, 3));

    geometry.addAttribute("uid", new THREE.Float32BufferAttribute(uids, 1));

    geometry.addAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

    geometry.addAttribute("f", new THREE.Float32BufferAttribute(fixed, 1));

    return geometry;
  }
}
