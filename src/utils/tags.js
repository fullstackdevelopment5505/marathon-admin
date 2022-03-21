import { uuidv4 } from './index'

export const parseTags = (tags = []) => {
  const assetMap = {}
  const assetTypeMap = {}
  const tagMap = {}
  const tagTypeMap = {}

  tags.forEach((tag) => {
    const { tagId, deviceId, owner, dataSource, view } = tag
    const tagSplitted = tagId.split('.')
    let typeParentId = null
    let typeParentSlug = null
    let parentId = null
    let tagType = null

    tagSplitted.forEach((t, i) => {
      const typeName = t.replace(/\d+$/, '').replace(/\s/g, '')
      if (i === tagSplitted.length - 1) {
        tagType = typeName
      }

      const typeSlug = typeParentSlug ? typeParentSlug + "." + typeName.toLowerCase() : typeName.toLowerCase();//(tagId.split(t)[0] + t).toLowerCase().replace(/\d+$/, '').replace(/\s/g, '')
      if (!Object.keys(assetTypeMap).includes(t)) {
        // Remove trailing digit
        if (!(typeName in assetTypeMap)) {
          const assetTypeId = uuidv4()
          assetTypeMap[typeName] = {
            id: assetTypeId,
            name: typeName,
            slug: typeSlug,//typeName.toLowerCase(),
            unit: '',
            parentId: typeParentId,
            view: view,
            dataSource: dataSource,
          }
          typeParentId = assetTypeId;
          typeParentSlug = typeSlug;
        } else {
          typeParentId = assetTypeMap[typeName].id
          typeParentSlug = assetTypeMap[typeName].slug

        }
      }

      const slug = (tagId.split(t)[0] + t).toLowerCase()
      if (!(slug in assetMap)) {
        const assetId = uuidv4()
        assetMap[slug] = {
          id: assetId,
          parentId: parentId,
          //assetTypeId: assetTypeMap[typeName].id,
          assetTypeName: assetTypeMap[typeName].name,
          slug: slug,
        }
        parentId = assetId
      } else {
        parentId = assetMap[slug].id
      }
    })

    // Last asset type is the tag type
    const assetType = assetTypeMap[tagType]
    tagTypeMap[assetType.slug] = {
      id: uuidv4(),
      name: assetType.name,
      slug: assetType.slug,
      assetTypeId: assetType.id,
    }

    tagMap[tagId] = {
      id: uuidv4(),
      tagId: tagId,
      owner: owner,
      //tagTypeId: tagTypeMap[assetType.slug].id,
      tagTypeName: tagTypeMap[assetType.slug].name,
      isDemoTag: true
    }
  })

  return {
    assetMap,
    assetTypeMap,
    tagMap,
    tagTypeMap,
  }
}
