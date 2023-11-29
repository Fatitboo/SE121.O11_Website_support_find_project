package dev.projectFinder.server.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserInforDTO {
    // dto userInfo
    private String fullName;
    private String phoneNumber;
    private String email;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dob;
    private String website;
    private String description;
    private String expectSalary;
    private String teamSize;
    // dto social link
    private String fbLink;
    private String twLink;
    private String lkLink;
    private String insLink;
    // dto address
    private String country;
    private String province;
    private String district;
    private String ward;
    private String addressDetail;

    // action implement for data
    // 1: update social link
    // 2: update address
    // 3: update user info
    private int actions;

}
