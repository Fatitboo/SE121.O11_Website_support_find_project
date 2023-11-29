package dev.projectFinder.server.components;

import lombok.*;
import org.bson.types.ObjectId;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CVLink {
    private String cvId;
    private String filename;
    private String fileUrl;
    private String publicId;
    private Boolean isDefault;
}
