package dev.projectFinder.server.dtos;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import dev.projectFinder.server.components.Payment.Payer;
import dev.projectFinder.server.components.Payment.Transaction.Transaction;
import dev.projectFinder.server.components.Vacancy.UserInfo;
import dev.projectFinder.server.models.Vacancy;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HistoryDTO {
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
    public String response;
    public ProjectHistoryDTO project;
    public UserInfo userInfo;
}
