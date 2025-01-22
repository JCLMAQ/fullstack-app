export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
  subItems?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  {
    icon: 'home',
    label: 'SideNavMenu.Home',
    route: 'home',
  },
  {
    icon: 'apps', // apps
    label: 'SideNavMenu.Todos',
    route: 'todos',
  },
  {
    icon: 'task',
    label: 'SideNavMenu.Tasks',
    route: 'tasks',
  },
  {
    icon: 'dashboard',
    label: 'SideNavMenu.Dashboard',
    route: 'dashboard',
  },
  {
    icon: 'format_list_bulleted',
    label: 'SideNavMenu.Components',
    route: 'components',
    subItems: [
      {
        icon: 'touch_app',
        label: 'Buttons',
        route: 'buttons',
      },
      {
        icon: 'question_answer',
        label: 'Dialog',
        route: 'dialog',
      },
      {
        icon: 'text_fields',
        label: 'Inputs',
        route: 'inputs',
      },
      {
        icon: 'view_agenda',
        label: 'Panels',
        route: 'panels',
      },
      {
        icon: 'donut_large',
        label: 'Progress',
        route: 'progress',
      },
      {
        icon: 'format_list_numbered',
        label: 'Stepper',
        route: 'stepper',
      },
      {
        icon: 'table_chart',
        label: 'Table',
        route: 'table',
      },
      {
        icon: 'tab',
        label: 'Tabs',
        route: 'tabs',
      },
    ],
  },
  {
    icon: 'video_library',
    label: 'SideNavMenu.Content',
    route: 'content',
  },
  {
    icon: 'comment',
    label: 'SideNavMenu.Comments',
    route: 'comments',
  },
];
