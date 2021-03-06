var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../uv-shared-module/BaseCommands", "../uv-shared-module/Dialogue"], function (require, exports, BaseCommands, Dialogue) {
    var ClickThroughDialogue = (function (_super) {
        __extends(ClickThroughDialogue, _super);
        function ClickThroughDialogue($element) {
            _super.call(this, $element);
        }
        ClickThroughDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('clickThroughDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseCommands.SHOW_CLICKTHROUGH_DIALOGUE;
            this.closeCommand = BaseCommands.HIDE_CLICKTHROUGH_DIALOGUE;
            $.subscribe(this.openCommand, function (e, params) {
                _this.acceptCallback = params.acceptCallback;
                _this.resource = params.resource;
                _this.open();
            });
            $.subscribe(this.closeCommand, function (e) {
                _this.close();
            });
            this.$title = $('<h1></h1>');
            this.$content.append(this.$title);
            this.$content.append('\
            <div>\
                <p class="message scroll"></p>\
                <div class="buttons">\
                    <a class="acceptTerms btn btn-primary" href="#" target="_parent"></a>\
                </div>\
            </div>');
            this.$message = this.$content.find(".message");
            this.$acceptTermsButton = this.$content.find(".acceptTerms");
            // TODO: get from config this.$acceptTermsButton.text(this.content.acceptTerms); // figure out config
            this.$acceptTermsButton.text("Accept Terms and Open");
            this.$element.hide();
            this.$acceptTermsButton.on('click', function (e) {
                e.preventDefault();
                _this.close();
                $.publish(BaseCommands.ACCEPT_TERMS);
                if (_this.acceptCallback)
                    _this.acceptCallback();
            });
        };
        ClickThroughDialogue.prototype.open = function () {
            _super.prototype.open.call(this);
            this.$title.text(this.resource.clickThroughService.getProperty('label'));
            this.$message.html(this.resource.clickThroughService.getProperty('description'));
            this.$message.targetBlank();
            this.$message.find('a').on('click', function () {
                var url = $(this).attr('href');
                $.publish(BaseCommands.EXTERNAL_LINK_CLICKED, [url]);
            });
            this.resize();
        };
        ClickThroughDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return ClickThroughDialogue;
    })(Dialogue);
    return ClickThroughDialogue;
});
//# sourceMappingURL=ClickThroughDialogue.js.map