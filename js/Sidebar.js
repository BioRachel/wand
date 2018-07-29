class Sidebar {
  constructor() {
    this.sidebarContent = document.querySelector(".sidenavvv");
    this.addSectionButton = document.getElementById("add-section");
    this.sections = 1;

  };

  addSection() {
    this.sections++;
    var section = document.createElement("input");
    section.type = "text";
    section.classList.add("form__sidebar-section");
    section.id = `section-${this.sections}`;
    section.value = 'New Section';
    this.addSectionButton.parentElement.insertBefore(section, this.addSectionButton);
  };

};



// functions
