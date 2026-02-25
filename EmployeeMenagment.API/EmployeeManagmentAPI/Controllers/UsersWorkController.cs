using EmployeeManagmentAPI.Data;
using EmployeeManagmentAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagmentAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class UsersWorkController : Controller
    {
        public readonly EmployeeDbContext employeeDbContext;

        public UsersWorkController(EmployeeDbContext _employeeDbContext) 
        {
            this.employeeDbContext = _employeeDbContext;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllWork()
        {
            var work = await employeeDbContext.UserWork.ToListAsync();
            return Ok(work);
        }

        [HttpGet]
        [Route("{userID:int}")]
        public async Task<IActionResult> GetUsersWork(int userID)
        {

            var UsersWork = await employeeDbContext.UserWork.ToListAsync();
            List<Work> workList = new List<Work>();

            if (UsersWork == null)
            {
                return NotFound();
            }
            foreach (var _user in UsersWork) 
            {
                if (_user.UserID == userID)
                {
                    workList.Add(_user);
                }
            }

            return Ok(workList);
        }

        [HttpGet]
        [Route("/api/[controller]/GetWorkByID/{WorkId:int}")]
        public async Task<IActionResult> GetWorkbyid(int WorkId)
        {
            var work = await employeeDbContext.UserWork.FirstOrDefaultAsync(x => x.Id == WorkId);
            
            if(work == null)
            {
                 return NotFound();
            }
            return Ok(work);
        }


        [HttpPost]
        public async Task<IActionResult> AddWork([FromBody] Work _work)
        {
            if (_work != null && HelperEM.CheckWorkContent(_work)) 
            {

                await employeeDbContext.UserWork.AddAsync(_work);
                await employeeDbContext.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut]
       //[Route("{IdCard:int}")]
        public async Task<IActionResult> UpdateUser([FromBody] Work _work )
        {
            var work = await employeeDbContext.UserWork.FirstOrDefaultAsync(x => x.Id == _work.Id);

            if (User == null)
            {
                return NotFound();
            }

            work.WorkName = _work.WorkName;
            work.WorkDescription = _work.WorkDescription;

            if (HelperEM.CheckWorkContent(work))
            {
                await employeeDbContext.SaveChangesAsync();
                return Ok();
            }
            
            return BadRequest();

        }

        [HttpDelete]
        [Route("{DelId:int}")]
        public async Task<IActionResult> DeleteUser(int DelId)
        {
            var work = await employeeDbContext.UserWork.FirstOrDefaultAsync(x => x.Id == DelId);

            if (work == null)
            {
                return NotFound();
            }

            employeeDbContext.UserWork.Remove(work);
            await employeeDbContext.SaveChangesAsync();

            return Ok();

        }









    }
}
