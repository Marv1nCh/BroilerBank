package com.nemo.broilerbackend.importDB;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("import")
public class ImportController {

    private final ImportService importService;

    @Autowired
    public ImportController(ImportService importService) {
        this.importService = importService;
    }

    @PostMapping("/csv/user")
    public ResponseEntity<String> importUsersFromCSV(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        try {
            importService.importUsersFromCsv(file);
            return ResponseEntity.ok("CSV imported successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Import failed: " + e.getMessage());
        }
    }

    @PostMapping("/csv/product")
    public ResponseEntity<String> importProductsAndPricesFromCSV(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        try {
            importService.importProductsAndPricesFromCsv(file);
            return ResponseEntity.ok("CSV imported successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Import failed: " + e.getMessage());
        }
    }

    @PostMapping("/csv/purchase")
    public ResponseEntity<String> importPurchasesFromCSV(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        try {
            importService.importPurchasesFromCsv(file);
            return ResponseEntity.ok("CSV imported successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Import failed: " + e.getMessage());
        }
    }
}

