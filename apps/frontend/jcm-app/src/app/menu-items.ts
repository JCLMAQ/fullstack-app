export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
  subItems?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    route: 'dashboard',
  },
  {
    icon: 'format_list_bulleted',
    label: 'Components',
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
    label: 'Content',
    route: 'content',
  },
  {
    icon: 'comment',
    label: 'Comments',
    route: 'comments',
  },
];
