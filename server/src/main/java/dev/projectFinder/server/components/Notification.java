package dev.projectFinder.server.components;

import lombok.*;

import java.time.LocalDateTime;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Notification {
    private String contentNoti;
    private LocalDateTime notiTime;
}
