package dev.projectFinder.server.responses;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import dev.projectFinder.server.components.CVLink;
import lombok.*;
import org.bson.types.ObjectId;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId userId;
    private String fullName;
    private CVLink avatar;
    private String userType;
    private Boolean isVerify;
    private Boolean isActive;
    private String token;

}
