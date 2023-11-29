package dev.projectFinder.server.models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import dev.projectFinder.server.components.Vacancy.*;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "uncompletedVacancies")
public class UnCompletedVacancy {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId vacancyId;
    //cor Info
    private UserInfo userInfo;
    private JobBasic jobBasic;
    private JobDetail jobDetail;
    private JobBenefit jobBenefit;
    private JobDes jobDes;
    private JobRef jobRef;
    private JobPreScreen[] jobPreScreen;
    private int flag;
}
