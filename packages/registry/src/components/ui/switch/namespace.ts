import SwitchControl from './SwitchControl.vue'
import SwitchDescription from './SwitchDescription.vue'
import SwitchHiddenInput from './SwitchHiddenInput.vue'
import SwitchLabel from './SwitchLabel.vue'
import SwitchRoot from './SwitchRoot.vue'
import SwitchThumb from './SwitchThumb.vue'

import { Switch as ArkSwitch } from '@ark-ui/vue/switch'

export const Switch = {
  /**
   * SwitchRoot component
   */
  Root: SwitchRoot,

  /**
   * SwitchControl component
   */
  Control: SwitchControl,

  /**
   * SwitchThumb component
   */
  Thumb: SwitchThumb,

  /**
   * SwitchLabel component
   */
  Label: SwitchLabel,

  /**
   * SwitchDescription component
   */
  Description: SwitchDescription,

  /**
   * SwitchHiddenInput component
   */
  HiddenInput: SwitchHiddenInput,

  /**
   * SwitchRootProvider component
   *
   * See: https://ark-ui.com/docs/components/switch#props
   */
  RootProvider: ArkSwitch.RootProvider,
}
