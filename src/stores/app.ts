import type { Ref } from 'vue'
import { baseSettings } from '~/settings'
import { replacePrimaryColor } from '~/utils'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const {
      bool: menuCollapsed,
      setBool: toggleMenuCollapsed,
    } = useBoolean()
    const {
      layout,
      showTheLogo,
      showTheTags,
      cacheTheTags,
      fixHeader,
      primaryColor,
      openAnimation,
      animationMode,
    } = toRefs(baseSettings)
    // stage the change of style right panel done
    const stage = reactive<Record<string, Ref>>({})
    function buildStage() {
      for (const [k, v] of Object.entries(toRaw(baseSettings)))
        stage[k] = ref(v)
    }
    buildStage()
    function getStageVal() {
      return toRefs(stage)
    }
    function updateByStage() {
      for (const [k, v] of Object.entries(toRaw(stage)))
        baseSettings[k] = unref(v)
      replacePrimaryColor(primaryColor.value)
    }
    function resetStage() {
      buildStage()
    }
    return {
      layout,
      showTheLogo,
      showTheTags,
      cacheTheTags,
      fixHeader,
      primaryColor,
      openAnimation,
      animationMode,
      menuCollapsed,
      getStageVal,
      updateByStage,
      resetStage,
      toggleMenuCollapsed,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
