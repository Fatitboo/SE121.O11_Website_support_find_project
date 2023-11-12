package dev.projectFinder.server.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UploadServices {
    private final Cloudinary cloudinary;
    public Map<?,?> uploadFile(MultipartFile file) throws IOException {
        return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
    }
    public void deleteFile(String publicId) throws Exception {
        cloudinary.api().deleteResources(Arrays.asList(publicId),
                ObjectUtils.asMap("type", "upload", "resource_type", "image"));
    }
}
