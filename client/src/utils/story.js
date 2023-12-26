 export const storyIndexing = (story) => {
   let columnType = {top : 'columnsTop', right : 'columnsRight'}
  let newStory = []
  let scene = {scene_number : '', scene_id : '', charecters_count : '', charecters : {}, character_array : []}
  let columnStart = false

  for(let  item of story ) {
    if(item?.type === columnType.top) {
      if(columnStart) {
        newStory.push(scene) ;
        scene = {scene_number : '', scene_id : '', charecters_count : '', charecters : {},character_array : []}
      }

      scene.scene_number = item?.data?.cols?.[0]?.blocks?.[0]?.data?.text
      scene.charecters_count = Number(item?.data?.cols?.[1]?.blocks?.[0]?.data?.text?.split(',')?.length || 0)
      scene.scene_id = item?.id
      scene.character_array = item?.data?.cols?.[1]?.blocks?.[0]?.data?.text?.split(',') || []
      columnStart =true
    }

    if(item?.type === columnType.right && item?.data?.newCol?.[0]?.blocks?.[0]?.data?.text && columnStart) {
      scene.charecters[item?.data?.newCol?.[0]?.blocks?.[0]?.data?.text] =( scene.charecters[item?.data?.newCol?.[0]?.blocks?.[0]?.data?.text]|| 0 )+ 1 
    }


  }

  newStory.push(scene) ;
  return newStory
}

