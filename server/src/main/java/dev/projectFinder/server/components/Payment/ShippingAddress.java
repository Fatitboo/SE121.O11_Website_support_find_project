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
public class ShippingAddress {
    public String city;
    public String country_code;
    public String line1;
    public String postal_code;
    public String recipient_name;
    public String state;
    public ShippingAddress(JsonNode node){
        city = node.get("city").asText();
        country_code = node.get("country_code").asText();
        line1 = node.get("line1").asText();
        postal_code = node.get("postal_code").asText();
        recipient_name = node.get("recipient_name").asText();
        state = node.get("state").asText();
    }

}
