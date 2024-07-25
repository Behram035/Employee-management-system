using EFwepApi.Data;
using EFwepApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EFwepApi.Controllers
{
    [Route("api/[action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        public readonly Context dbContext;
        public EmployeeController(Context dbContext)
        {
            this.dbContext = dbContext;
        }
        //[Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await dbContext.Employee.ToListAsync();
            return Ok(employees);
        }
        //[Authorize]
        [HttpPost]
        public async Task<IActionResult> AddEmployee(EmployeeModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var employee = await dbContext.Employee.FirstOrDefaultAsync(x => x.Email == model.Email );

            if (employee == null){

            var addEmployee = new Employee
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Gender = model.Gender,
                Title = model.Title,
                Address = model.Address,
                Department = model.Department,
                Description = model.Description,
            };
            await dbContext.Employee.AddAsync(addEmployee);
            await dbContext.SaveChangesAsync();
            return Ok(addEmployee);
            }
            else
            {
                return BadRequest("Employee is Registered with This Email.");
            }
        }
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetEmployee(Guid id)
        {
            var employee = await dbContext.Employee.FindAsync(id);
            if (employee is null)
            {
                return BadRequest("Employee NOT FOUND");
            }
            return Ok(employee);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateEmployee(Employee model)
        {
            var employee = await dbContext.Employee.FindAsync(model.Id);
            if (employee is not null)
            {
                employee.UpdatedAt = DateTime.Now;
                employee.FirstName = model.FirstName;
                employee.LastName = model.LastName;
                employee.Gender = model.Gender;
                employee.Email = model.Email;
                employee.Title = model.Title;
                employee.Address = model.Address;
                employee.Department = model.Department;
                employee.Description = model.Description;

                await dbContext.SaveChangesAsync();
                return Ok(employee);

            }
                return NotFound("Employee Could Not Updated");
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {
            var employee = await dbContext.Employee.FindAsync(id);
            if (employee != null)
            {
                dbContext.Employee.Remove(employee);
                await dbContext.SaveChangesAsync();
            }
            return Ok("Employee DELETED Successfully");
        }
    }
}
