package dev.projectFinder.server.components.Payment;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PayerInfo {
    public String country_code;
    public String email;
    public String first_name;
    public String last_name;
    public String payer_id;
    public ShippingAddress shipping_address;
    public PayerInfo(JsonNode node){
        country_code = node.get("country_code").asText();
        email = node.get("email").asText();
        first_name = node.get("first_name").asText();
        last_name = node.get("last_name").asText();
        payer_id = node.get("payer_id").asText();
        shipping_address = new ShippingAddress(node.get("shipping_address"));
    }
}
