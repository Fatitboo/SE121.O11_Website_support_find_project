package dev.projectFinder.server.components.Payment.Transaction.RelativeResource;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import dev.projectFinder.server.components.Payment.Transaction.Amount;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Sale {
    private String create_time;
    private String update_time;
    private String id;
    private String state;
    private Amount transaction_fee;
    public Sale(JsonNode node){
        create_time = node.get("create_time").asText();
        update_time = node.get("update_time").asText();
        id = node.get("id").asText();
        state = node.get("state").asText();
        transaction_fee = new Amount(node.get("transaction_fee"));
    }
}
