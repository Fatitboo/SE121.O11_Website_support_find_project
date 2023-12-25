package dev.projectFinder.server.dtos;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VacancyHistoryDTO {
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId vacancyId;
    //job basic
    private String vacancyName;
    private int maxRequired;
    //--location
    private String locationType;
    private String location;

    private LocalDateTime createdAt;
    private String hiringTimeline;
    private float paymentAmount;
}
