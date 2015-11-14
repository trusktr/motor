let Node = motor.core.Node;

// Globals
const CSS_CLASS_SCROLLABLE = "motor-scrollable";

/**
 * TemplateNode Class
 *
 * @class TemplateNode
 */
class TemplateNode extends Node {

  /**
   * @constructor
   */
  constructor (options) {
    super(options);

    // Options Check
    if (!options) {
      console.log("TemplateNode requires the options param!");
      return false;
    }

    // Template Check
    if (!Template[options.template]) {
      console.log("Template not found! " + options.template);
      return;
    }

    // Classes
    options.classes = [options.template].concat(options.classes);

    // Scrollable
    if (options.scrollable)
      options.classes.push(CSS_CLASS_SCROLLABLE);

    // Set Classes
    this.setClasses(options.classes);

    // Render template
    Blaze.renderWithData(Template[options.template], options.data || {}, this._element);
  }
}

motor.integrations.meteor.TemplateNode = TemplateNode;