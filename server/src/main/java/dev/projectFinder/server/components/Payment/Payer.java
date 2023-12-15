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
public class Payer {
    private PayerInfo payer_info;
    private String payment_method;
    private String status;
    public Payer (JsonNode node){
        payer_info = new PayerInfo(node.get("payer_info"));
        payment_method = node.get("payment_method").asText();
        status = node.get("status").asText();
    }
}
