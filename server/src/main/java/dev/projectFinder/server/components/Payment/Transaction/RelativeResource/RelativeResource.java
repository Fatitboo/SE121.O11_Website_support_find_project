package dev.projectFinder.server.components.Payment.Transaction.RelativeResource;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RelativeResource {
    private Sale sale;
    public RelativeResource(JsonNode node){
        if (node.isArray()) {
            for (final JsonNode objNode : node) {
                sale = new Sale(objNode.get("sale"));
            }
        }
    }
}
