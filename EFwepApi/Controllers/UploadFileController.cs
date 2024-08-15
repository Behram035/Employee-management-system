using EFwepApi.Data;
using EFwepApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;

namespace EFwepApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadFileController : ControllerBase
    {
        private readonly Context dbContext;
        public UploadFileController(Context dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpPost]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file is Uploaded...");
            }
            using var stream = new MemoryStream();

            await file.CopyToAsync(stream);
            using var Package = new ExcelPackage(stream);

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            var worksheet = Package.Workbook.Worksheets[0];
            var rowCount = worksheet.Dimension.Rows;

            for (int row = 2; row <= rowCount; row++)
            {

                var excelData = new Employee
                {
                    FirstName = worksheet.Cells[row, 1].Value?.ToString(),
                    LastName = worksheet.Cells[row, 2].Value?.ToString(),
                    Email = worksheet.Cells[row, 3].Value?.ToString(),
                    Gender = worksheet.Cells[row, 4].Value?.ToString(),
                    Title = worksheet.Cells[row, 5].Value?.ToString(),
                    Address = worksheet.Cells[row, 6].Value?.ToString(),
                    Department = worksheet.Cells[row, 7].Value?.ToString(),
                    Description = worksheet.Cells[row, 8].Value?.ToString(),
                    CreatedDate = DateTime.Now,
                };

                var emailCheck = await dbContext.Employee.FirstOrDefaultAsync(x => x.Email == excelData.Email);
                if (emailCheck != null)
                {
                    return BadRequest(new { Message = "Email Exist..", Email = emailCheck });
                }
                await dbContext.Employee.AddAsync(excelData);

            }
            await dbContext.SaveChangesAsync();

            return Ok("Data uploaded successfully...");
        }
    }
}
