package dev.projectFinder.server.components.Payment.Transaction;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.projectFinder.server.components.Payment.Transaction.RelativeResource.RelativeResource;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Transaction {
    private Amount amount;
    private String description;
    private Payee payee;
    private RelativeResource related_resources;
    public Transaction(JsonNode node){
        if (node.isArray()) {
            for (final JsonNode objNode : node) {
                amount = new Amount(objNode.get("amount"));
                description = objNode.get("description").asText();
                payee = new Payee(objNode.get("payee"));
                related_resources = new RelativeResource(objNode.get("related_resources"));
            }
        }

    }
}
