export const darkStyles = `

body {
  background-color: rgb(0,0,0) !important;
  color: #fff;
}

body ::-webkit-scrollbar-thumb {
  background-color: grey;
}

.ui.card, .ui.tab.active, .ui.modal>.content, .menu.vertical>.item  {
  background-color: rgb(0, 0, 0) !important;
  color: #fff !important;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
}

.quickadd .menu>.message{
  display: none;
}

.ui.dropdown .menu>.item, .ui.right.center.popup, .ui.right.center.popup:before {
  background-color: rgb(0, 0, 0) !important;
  color: #fff !important;
}

.ui.action.input>.button {
  background-color: rgb(0, 0, 0,0.5) !important;
  color: #fff !important;
}


.ui.cards>.card>.extra, .ui.card>.extra, .ui.card>.content {
  border-top: 1px solid rgba(221,219,217,.15) !important;
}


.ui.divided.list>.item {
  border-top: 1px solid rgba(221,219,217,.15) ;
}

.ui.secondary.pointing.menu {
  border-bottom: 2px solid rgba(210,210,210,.15);
}

.ui.secondary.pointing.menu .active.item {
  border-color: rgba(230,230,230,.15);
}

.cb, input, .ui.selection.dropdown .menu>.message, .ui.search.dropdown{
  background-color: #000000 !important;
  color: #fff !important;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5 !important;
  border-radius: .28571429rem;
}

.ui.header, .ui.card>.content>.header, .ui.card>.content>.description, .ui.list>.item .header, .meta, .field>label, .ui.secondary.pointing.menu .item, 
.ui.card>.content>.description, .ui.feed>.event>.content .summary, .ui.feed>.event>.content .summary>.date, .ui.vertical.menu .menu .item {
  color: #fff !important;


  .ui.dropdown .menu .selected.item, .ui.dropdown.selected {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;

}
`;

export const lightStyles = `


body {
  background-color: rgb(250, 250, 250) !important;
}

.ui.header, .ui.card>.content>.header, .ui.card>.content>.description, .ui.list>.item .header, .meta, .field>label, .ui.secondary.pointing.menu .item, 
.ui.card>.content>.description, .ui.feed>.event>.content .summary, .ui.feed>.event>.content .summary>.date {
  color: rgb(0,0,0,1) !important;
}

.ui.action.input>.button {
  background-color: rgb(255, 255, 255,0.5) !important;
  border: 1px solid rgba(34,36,38,.15);
}

.customButtonGroupCombiner:before {
  background-color: #21ba45 !important;
}


.quickadd .menu>.message{
  display: none;
}


.ui.dropdown .menu .selected.item, .ui.dropdown.selected {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}

`;