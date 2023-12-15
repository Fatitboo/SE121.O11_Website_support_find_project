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
public class Payee {
    public String email;
    public String merchant_id;
    public Payee (JsonNode node){
        email = node.get("email").asText();
        merchant_id = node.get("merchant_id").asText();
    }
}
