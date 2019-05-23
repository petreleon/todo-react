import React from "react";
import {
  Button,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
class FolderButtonElement extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      dropdownIsOpen: false
    };
  }
  toggleDropdown() {
    this.setState({ dropdownIsOpen: !this.state.dropdownIsOpen });
  }
  render() {
    return (
      <ButtonDropdown
        isOpen={this.state.dropdownIsOpen}
        toggle={this.toggleDropdown}
        block
      >
        <Button
          onClick={this.props.changeToFolder}
          color={
            "todo_" + this.props.foldername === this.props.actualfoldername
              ? "primary"
              : "secondary"
          }
          block
        >
          {this.props.foldername}
        </Button>
        {"todo_" + this.props.foldername !== this.props.actualfoldername && (
          <div>
            <DropdownToggle caret color="secondary" />
            <DropdownMenu>
              <Button onClick={this.props.deleteFolder} color="secondary" block>
                delete
              </Button>
            </DropdownMenu>
          </div>
        )}
      </ButtonDropdown>
    );
  }
}
export default FolderButtonElement;
