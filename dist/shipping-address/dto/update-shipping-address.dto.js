"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShippingAddressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_shipping_address_dto_1 = require("./create-shipping-address.dto");
class UpdateShippingAddressDto extends (0, swagger_1.PartialType)(create_shipping_address_dto_1.CreateShippingAddressDto) {
}
exports.UpdateShippingAddressDto = UpdateShippingAddressDto;
//# sourceMappingURL=update-shipping-address.dto.js.map