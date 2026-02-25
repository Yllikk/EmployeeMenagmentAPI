using EmployeeManagmentAPI.Data;
using EmployeeManagmentAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagmentAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class RequestedRegistersController : Controller
    {

        public readonly EmployeeDbContext employeeDbContext;

        public RequestedRegistersController(EmployeeDbContext _employeeDbContext)
        {
            employeeDbContext = _employeeDbContext;
        }

        



        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] RegisterReqUsers user)
        {
            var employees = await employeeDbContext.employees.ToListAsync();
            var RegReqEmployees = await employeeDbContext.registerReqUsers.ToListAsync();

            if (HelperEM.CheckContent(user))
            {
                foreach (var LoggedEmp in employees)
                {
                    if (user.Email.Equals(LoggedEmp.Email) || user.IdCard == LoggedEmp.IdCard)
                    {
                        return Conflict();
                    }
                }
                foreach (var RegReqEmp in RegReqEmployees)
                {
                    if (user.Email.Equals(RegReqEmp.Email) || user.IdCard == RegReqEmp.IdCard)
                    {
                        return Conflict();
                    }
                }

                await employeeDbContext.registerReqUsers.AddAsync(user);
                await employeeDbContext.SaveChangesAsync();

                return Ok(user);
            }

            return BadRequest();

        }

        [HttpGet]
        public async Task<IActionResult> GetRegEmployees()
        {
            var employees = await employeeDbContext.registerReqUsers.ToListAsync();

            return Ok(employees);
        }

        [HttpGet]
        [Route("{loggIdCard:int}")]
        public async Task<IActionResult> GetReqUsers(int loggIdCard)
        {

            var employees = await employeeDbContext.registerReqUsers.FirstOrDefaultAsync(x => x.IdCard == loggIdCard);

            if (employees == null)
            {
                return NotFound();
            }

            return Ok(employees);
        }

        [HttpDelete]
        [Route("{DelIdCard:int}")]
        public async Task<IActionResult> DeleteReqUser(int DelIdCard)
        {
            var employee = await employeeDbContext.registerReqUsers.FirstOrDefaultAsync(x => x.IdCard == DelIdCard);

            if (employee == null)
            {
                return NotFound();
            }

            employeeDbContext.registerReqUsers.Remove(employee);
            await employeeDbContext.SaveChangesAsync();
            return Ok();


        }



    }
}
