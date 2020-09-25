export default {
  route: {
    dashboard: 'Dashboard',
    documentation: 'Tài liệu',
    guide: 'Hướng dẫn',
    permission: 'Quyền',
    pagePermission: 'Page Permission',
    rolePermission: 'Role Permission',
    directivePermission: 'Directive Permission',
    icons: 'Icons',
    components: 'Components',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: 'Mixin',
    backToTop: 'Lên đầu trang',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Bảng',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    articleList: 'Article List',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    mergeHeader: 'Merge Header',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'External Link',
    profile: 'Profile'
  },
  navbar: {
    dashboard: 'Dashboard',
    github: 'Github',
    logOut: 'Đăng xuất',
    profile: 'Hồ sơ cá nhân',
    theme: 'Giao diện',
    size: 'Kích thước trang web'
  },
  login: {
    title: 'Form đăng nhập',
    logIn: 'Đăng nhập',
    username: 'Tên tài khoản',
    password: 'Mật khẩu',
    any: 'any',
    thirdparty: 'Kết nối bằng công cụ khác',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    addRole: 'New Role',
    editPermission: 'Edit',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips: 'In some cases, using v-permission will have no effect. For example: Element-UI  el-tab or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits. In the process of selecting rich texts, I also took a lot of detours. The common rich texts on the market have been basically used, and I finally chose Tinymce. See the more detailed rich text comparison and introduction.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  example: {
    warning: 'Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all pages directly. See details'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name (default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name (default file)'
  },
  pdf: {
    tips: 'Here we use window.print() to implement the feature of downloading PDF.'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  pagination: {
    goto: 'Đến trang',
    pagesize: '/trang',
    total: 'Tổng {total}',
    pageClassifier: ''
  },
  settings: {
    title: 'Chỉnh sửa bố cục trang',
    theme: 'Màu sắc giao diện',
    tagsView: 'Chế độ xem bằng tab',
    fixedHeader: 'Cố định tiêu đề',
    sidebarLogo: 'Hiển thị logo'
  },
  datepicker: {
    now: 'Hiện tại',
    today: 'Hôm nay',
    cancel: 'Hủy',
    clear: 'Xóa',
    confirm: 'OK',
    selectDate: 'Chọn ngày',
    selectTime: 'Chọn giờ',
    startDate: 'Ngày bắt đầu',
    startTime: 'Thời gian bắt đầu',
    endDate: 'Ngày kết thúc',
    endTime: 'Thời gian kết thúc',
    prevYear: 'Năm trước',
    nextYear: 'Năm tới',
    prevMonth: 'Tháng trước',
    nextMonth: 'Tháng tới',
    year: '',
    month1: 'Tháng 1',
    month2: 'Tháng 2',
    month3: 'Tháng 3',
    month4: 'Tháng 4',
    month5: 'Tháng 5',
    month6: 'Tháng 6',
    month7: 'Tháng 7',
    month8: 'Tháng 8',
    month9: 'Tháng 9',
    month10: 'Tháng 10',
    month11: 'Tháng 11',
    month12: 'Tháng 12',
    // week: 'week',
    weeks: {
      sun: 'CN',
      mon: 'T2',
      tue: 'T3',
      wed: 'T4',
      thu: 'T5',
      fri: 'T6',
      sat: 'T7'
    },
    months: {
      jan: 'Th.1',
      feb: 'Th.2',
      mar: 'Th.3',
      apr: 'Th.4',
      may: 'Th.5',
      jun: 'Th.6',
      jul: 'Th.7',
      aug: 'Th.8',
      sep: 'Th.9',
      oct: 'Th.10',
      nov: 'Th.11',
      dec: 'Th.12'
    }
  },
  switch_language_success: 'Đổi ngôn ngữ thành công',
  required_username: 'Vui lòng nhập tên người dùng',
  required_password: 'Vui lòng nhập mật khẩu',
  validate_password: 'Mật khẩu không thể ít hơn 6 ký tự',
  register: 'Đăng ký'
}