import {
  AudioWaveformIcon,
  BookOpenIcon,
  BotIcon,
  CommandIcon,
  FrameIcon,
  GalleryVerticalEndIcon,
  MapIcon,
  PieChartIcon,
  Settings2Icon,
  SquareTerminalIcon,
} from 'lucide-vue-next'
import { h } from 'vue'

export const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://github.com/shadcn.png',
  },

  teams: [
    {
      name: 'Acme Inc',
      logo: h(GalleryVerticalEndIcon),
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: h(AudioWaveformIcon),
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: h(CommandIcon),
      plan: 'Free',
    },
  ],

  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: h(SquareTerminalIcon),
      isActive: true,
      items: [
        { title: 'History', url: '#' },
        { title: 'Starred', url: '#' },
        { title: 'Settings', url: '#' },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: h(BotIcon),
      items: [
        { title: 'Genesis', url: '#' },
        { title: 'Explorer', url: '#' },
        { title: 'Quantum', url: '#' },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: h(BookOpenIcon),
      items: [
        { title: 'Introduction', url: '#' },
        { title: 'Get Started', url: '#' },
        { title: 'Tutorials', url: '#' },
        { title: 'Changelog', url: '#' },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: h(Settings2Icon),
      items: [
        { title: 'General', url: '#' },
        { title: 'Team', url: '#' },
        { title: 'Billing', url: '#' },
        { title: 'Limits', url: '#' },
      ],
    },
  ],

  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: h(FrameIcon),
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: h(PieChartIcon),
    },
    {
      name: 'Travel',
      url: '#',
      icon: h(MapIcon),
    },
  ],
}
