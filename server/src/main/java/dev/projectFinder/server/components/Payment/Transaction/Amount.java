package dev.projectFinder.server.components.Payment.Transaction;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Amount {
    private String total; // Dùng cho phí chính
    private String currency;
    private String value; //Dùng cho transaction fee
    public Amount (JsonNode node){
        if(node.get("total") != null) total = node.get("total").asText();
        currency = node.get("currency").asText();
        if(node.get("value") != null) value = node.get("value").asText();
    }
}
