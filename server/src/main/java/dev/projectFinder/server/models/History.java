package dev.projectFinder.server.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import dev.projectFinder.server.components.Payment.Payer;
import dev.projectFinder.server.components.Payment.Transaction.Transaction;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.cglib.core.Local;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "history")
public class History {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    public ObjectId historyId;
    public String cart;
    public String create_time;
    public String id; //payment id
    public String intent;
    public Payer payer;
    public String state;
    public Transaction transactions;
    public String update_time;
    public Vacancy vacancy;
    public Project project;
    public String response;
    public History(JsonNode node){
        response = node.asText();
        cart = node.get("cart").asText();
        create_time = node.get("create_time").asText();
        id = node.get("id").asText();
        payer = new Payer(node.get("payer"));
        state = node.get("state").asText();
        transactions = new Transaction(node.get("transactions"));
        update_time = node.get("update_time").asText();
    }
}
