/*
 * @author kaysaith
 * @date 2020/3/12 13:15
 */
export class ValueChecker {
    static isHexColor(value) {
        const reg = new RegExp("^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$");
        return reg.test(value);
    }
    static isRGBAColor(value) {
        const reg = new RegExp("/(^rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)$)|(^rgba\\((\\d+),\\s*(\\d+),\\s*(\\d+)(,\\s*\\d+\\.\\d+)*\\)$)/");
        return reg.test(value);
    }
    static isEmail(value) {
        const reg = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
        return reg.test(value);
    }
    // Chinese Phone Number
    static isPhoneNumber(phone) {
        const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        return reg.test(phone);
    }
    static isValidPassword(password) {
        const regex = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}");
        return regex.test(password);
    }
    // Chinese Personal ID Type
    static isIdentification(id) {
        const regex = new RegExp("/(^\\d{15}$)|(^\\d{17}([0-9]|X|x)$)/");
        return regex.test(id);
    }
    static isURL(url) {
        const regex = new RegExp("/^http:\\/\\/.+\\./");
        return regex.test(url);
    }
    static isImage(src) {
        const filter1 = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
        const filter2 = /(?:bmp|cis\-cod|gif|ief|jpg|svg|jpeg|pipeg|png|svg\+xml|tiff|x\-cmu\-raster|x\-cmx|x\-icon|x\-portable\-anymap|x\-portable\-bitmap|x\-portable\-graymap|x\-portable\-pixmap|x\-rgb|x\-xbitmap|x\-xpixmap|x\-xwindowdump)$/i;
        return filter1.test(src) || filter2.test(src);
    }
    static isValidSMSCode(smsCode) {
        const regex = new RegExp("^\\d{6}$");
        return regex.test(smsCode);
    }
    static isNotNull(item, hold) {
        if (item) {
            hold(item);
            return new Nullable(false);
        }
        else {
            return new Nullable(true);
        }
    }
}
export class Nullable {
    constructor(status, value) {
        this.status = status;
        this.value = value;
    }
    orElse(action) {
        if (this.status) {
            action();
        }
    }
    isNotNull(hold) {
        if (!this.status) {
            hold(this.value);
        }
        return this;
    }
}
